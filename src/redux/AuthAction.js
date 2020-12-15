const authActionType = {
  ADD: "ADD",
  DELETE: "DELETE"
};

const addAuthAction = res => {
  return { type: authActionType.ADD, payload: res };
};

const deleteAuthAction = index => {
  return { type: authActionType.DELETE, payload: index };
};

export { authActionType, addAuthAction, deleteAuthAction };
