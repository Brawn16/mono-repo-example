import UniversalCookie, {
  Cookie,
  CookieChangeOptions,
  CookieParseOptions,
  CookieSetOptions,
} from "universal-cookie";

export class Cookies extends UniversalCookie {
  private lastStorageCookieEvent?: string;

  public constructor(
    cookies?: string | object | null,
    options?: CookieParseOptions
  ) {
    super(cookies, options);
    this.handleStorageEvent = this.handleStorageEvent.bind(this);

    this.addWindowChangeListener();
  }

  public remove(name: string, options?: CookieSetOptions) {
    super.remove(name, options);
    this.triggerStorageEvent({ name, options, value: undefined });
  }

  public set(name: string, value: Cookie, options?: CookieSetOptions) {
    super.set(name, value, options);
    this.triggerStorageEvent({ name, options, value });
  }

  private addWindowChangeListener() {
    if (typeof window === "undefined") {
      return;
    }

    window.addEventListener("storage", this.handleStorageEvent);
  }

  private handleStorageEvent() {
    const event = window.localStorage.getItem("lastStorageCookieEvent");
    if (event === null || event === this.lastStorageCookieEvent) {
      return;
    }

    const parameters = JSON.parse(event);
    this.lastStorageCookieEvent = event;
    this["_emitChange"](parameters);
  }

  private triggerStorageEvent(options: CookieChangeOptions) {
    if (typeof window === "undefined") {
      return;
    }

    const parameters = JSON.stringify(options);

    this.lastStorageCookieEvent = parameters;
    window.localStorage.setItem("lastStorageCookieEvent", parameters);
  }
}
