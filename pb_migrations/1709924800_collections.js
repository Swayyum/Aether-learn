/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    name: 'users',
    type: 'auth',
    schema: [
      {
        name: 'name',
        type: 'text',
        required: true,
      },
      {
        name: 'avatar',
        type: 'file',
        required: false,
      },
      {
        name: 'role',
        type: 'select',
        options: {
          values: ['student', 'instructor', 'admin'],
        },
        required: true,
        default: 'student',
      },
    ],
  });

  const progress = new Collection({
    name: 'progress',
    schema: [
      {
        name: 'user',
        type: 'relation',
        required: true,
        options: {
          collectionId: 'users',
          cascadeDelete: true,
        },
      },
      {
        name: 'moduleId',
        type: 'text',
        required: true,
      },
      {
        name: 'completed',
        type: 'bool',
        required: true,
        default: false,
      },
      {
        name: 'score',
        type: 'number',
        required: false,
        min: 0,
        max: 100,
      },
      {
        name: 'lastAttempt',
        type: 'date',
        required: false,
      },
    ],
  });

  const courses = new Collection({
    name: 'courses',
    schema: [
      {
        name: 'title',
        type: 'text',
        required: true,
      },
      {
        name: 'description',
        type: 'text',
        required: true,
      },
      {
        name: 'level',
        type: 'select',
        options: {
          values: ['Beginner', 'Intermediate', 'Advanced'],
        },
        required: true,
      },
      {
        name: 'duration',
        type: 'text',
        required: true,
      },
      {
        name: 'image',
        type: 'file',
        required: false,
      },
      {
        name: 'instructor',
        type: 'relation',
        required: true,
        options: {
          collectionId: 'users',
          cascadeDelete: false,
        },
      },
    ],
  });

  const events = new Collection({
    name: 'events',
    schema: [
      {
        name: 'title',
        type: 'text',
        required: true,
      },
      {
        name: 'description',
        type: 'text',
        required: true,
      },
      {
        name: 'start',
        type: 'date',
        required: true,
      },
      {
        name: 'end',
        type: 'date',
        required: true,
      },
      {
        name: 'type',
        type: 'select',
        options: {
          values: ['workshop', 'study'],
        },
        required: true,
      },
      {
        name: 'creator',
        type: 'relation',
        required: true,
        options: {
          collectionId: 'users',
          cascadeDelete: false,
        },
      },
    ],
  });

  return {
    collections: [collection, progress, courses, events],
  };
});