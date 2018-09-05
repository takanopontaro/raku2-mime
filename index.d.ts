declare namespace Raku2Mime {
  type Options = {
    cwd?: string;
  };
  export const type: (
    path: string,
    options?: Raku2Mime.Options
  ) => Promise<string | null>;
  export const is: (
    fileType: string,
    path: string,
    options?: Raku2Mime.Options
  ) => Promise<boolean | null>;
}

export = Raku2Mime;
