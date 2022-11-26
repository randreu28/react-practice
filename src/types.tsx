export type folder = {
  name: string;
  isOpen: boolean;
  children: (folder | string)[] | null;
};
