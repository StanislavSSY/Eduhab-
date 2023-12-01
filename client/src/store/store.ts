import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slice/userSlice';
import { stepsSlice } from './slice/stepsSlice';
// ...

export const store = configureStore({
  reducer: { userSlice: userSlice.reducer, stepsSlice: stepsSlice.reducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
