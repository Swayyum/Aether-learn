import PocketBase from 'pocketbase';

// Using a hosted PocketBase instance
export const pb = new PocketBase('https://aether-ml.pockethost.io');

export const isValidSession = () => {
  return pb.authStore.isValid;
};

export const getCurrentUser = () => {
  return pb.authStore.model;
};

// Auth functions
export const login = async (email: string, password: string) => {
  return await pb.collection('users').authWithPassword(email, password);
};

export const signup = async (email: string, password: string, name: string) => {
  const data = {
    email,
    password,
    passwordConfirm: password,
    name,
    role: 'student',
  };
  return await pb.collection('users').create(data);
};

export const logout = () => {
  pb.authStore.clear();
};

// Course functions
export const getCourses = async () => {
  return await pb.collection('courses').getList(1, 50, {
    sort: '-created',
    expand: 'instructor',
  });
};

export const getCourse = async (id: string) => {
  return await pb.collection('courses').getOne(id, {
    expand: 'instructor',
  });
};

// Progress functions
export const getProgress = async (userId: string) => {
  return await pb.collection('progress').getList(1, 50, {
    filter: `user = "${userId}"`,
  });
};

export const updateProgress = async (id: string, data: any) => {
  return await pb.collection('progress').update(id, data);
};

// Event functions
export const getEvents = async () => {
  return await pb.collection('events').getList(1, 50, {
    sort: 'start',
    expand: 'creator',
  });
};

export const createEvent = async (data: any) => {
  return await pb.collection('events').create(data);
};