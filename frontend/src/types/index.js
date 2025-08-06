// Kiểu dữ liệu Task
export const TaskShape = {
  id: 'number',
  title: 'string',
  description: 'string',
  completed: 'boolean',
};

// Kiểu dữ liệu yêu cầu tạo task
export const CreateTaskRequestShape = {
  title: 'string',
  description: 'string',
};

// Kiểu dữ liệu yêu cầu cập nhật task
export const UpdateTaskRequestShape = {
  completed: 'boolean',
};

// Kiểu dữ liệu phản hồi API
export const CreateTaskResponseShape = {
  id: 'number',
};

export const DeleteTaskResponseShape = {
  message: 'string',
};

// Kiểu dữ liệu trạng thái giao diện
export const LoadingState = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

// Kiểu dữ liệu bộ lọc
export const TaskFilter = {
  ALL: 'all',
  PENDING: 'pending',
  COMPLETED: 'completed',
};
