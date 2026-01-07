export type Task = {
  id: string;
  name: string;
  desc: string;
  status: boolean;
};

export type TaskPayload = {
  name: string;
  desc: string;
  status: boolean;
  email?: string;
};

export type ProfileForm = {
  username: string;
  email: string;
};
