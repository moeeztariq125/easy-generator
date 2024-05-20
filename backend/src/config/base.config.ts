export default function getConfig<T>(requirements: string[]): T {
  const ret: T = {} as T;
  requirements.forEach((item) => {
    const env = process.env[item as string];
    if (!env) {
      console.error(`Please provide ${item} in the env file`);
      process.exit(1);
    }
    ret[item as keyof T] = env as any;
  });
  return ret;
}
