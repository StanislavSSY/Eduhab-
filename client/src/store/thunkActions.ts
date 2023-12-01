import { createAsyncThunk } from '@reduxjs/toolkit';

export const initSteps = createAsyncThunk('steps/init', async (lessonid) => {
  const result = await fetch(`http://localhost:3100/study/lesson/${lessonid}`);
  const data = (await result.json()).map((el, i) => ({
    ...el,
    stepNum: String(i + 1),
  }));
  console.log(data);
  return data;
});

export const addStep = createAsyncThunk('step/add', async (stepData) => {
  const result = await fetch(`http://localhost:3100/steps`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stepData),
  });
  const data = await result.json();
  const resData = { id: data.id, type: data.type };
  return resData;
});

export const updateStep = createAsyncThunk('step/update', async (stepData) => {
  const result = await fetch(`http://localhost:3100/steps/${stepData.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: stepData.data }),
  });
  return (await result.json())
    .sort((a, b) => Number(a.id) - Number(b.id))
    .map((el, i) => {
      return { ...el, stepNum: String(i + 1) };
    });
});

export const deleteStep = createAsyncThunk('step/delete', async (id) => {
  const result = await fetch(`http://localhost:3100/steps/${id}`, {
    method: 'DELETE',
  });
  return result.status === 200 ? id : false;
});
