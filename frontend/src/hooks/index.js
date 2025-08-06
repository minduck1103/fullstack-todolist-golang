// Xuất tất cả custom hooks từ đây
// Hooks sẽ được thêm vào các PR tiếp theo

// Xuất tạm thời - sẽ được thay thế khi tạo hooks
export const useTasks = () => ({ tasks: [], loading: false, error: null });
export const useAddTask = () => ({ addTask: () => {}, loading: false });
export const useUpdateTask = () => ({ updateTask: () => {}, loading: false });
export const useDeleteTask = () => ({ deleteTask: () => {}, loading: false });
