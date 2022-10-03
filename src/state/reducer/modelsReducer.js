const reducer = (state = { models: [] }, action) => {
  switch (action.type) {
    case "SET_MODELS":
      return { ...state, models: action.models };
    case "SET_MODEL":
      for (let i = 0; i < state.models.length; i++) {
        if (state.models[i].id == action.modelId) {
          state.models[i] = action.model;
          break;
        }
      }
      return state;
    case "ADD_MODEL":
      return { ...state, models: [...state.models, action.model] };
    case "DEL_MODEL":
      const dummy = state.models.filter((model) => action.modelId != model.id);
      return {
        ...state,
        models: dummy,
      };
    case "UPDATE_MODEL":
      for (let i = 0; i < state.models.length; i++) {
        if (state.models[i].id == action.modelId) {
          state.models[i] = action.model;
          break;
        }
      }
      return state;
    //Entry
    case "ADD_ENTRY":
      for (let model of state.models) {
        if (model.id == action.modelId) {
          if (!model.entries) {
            model.entries = [action.entry];
          } else model.entries = [...model.entries, action.entry];
          break;
        }
      }
      return { ...state };
    case "DELETE_ENTRY":
      for (let model of state.models) {
        if (model.id === action.modelId) {
          const currModel = { ...model };
          currModel.entries = currModel.entries.filter(
            (entry) => entry.id !== action.entryId
          );
          const newModels = state.models.filter(
            (model) => model.id !== action.modelId
          );
          return { ...state, models: [...newModels, currModel] };
        }
      }
    case "UPDATE_ENTRY":
      for (let model of state.models) {
        if (model.id === action.modelId) {
          const currModel = { ...model };
          let newModels = [];
          for (let i = 0; i < currModel.entries.length; i++) {
            if (currModel.entries[i].id == action.entryId) {
              currModel.entries[i] = action.entry;
              newModels = state.models.filter(
                (model) => model.id !== action.modelId
              );
              break;
            }
          }
          return { ...state, models: [...newModels, currModel] };
        }
      }
    //Validation
    case "ADD_VALIDATION":
      for (let model of state.models) {
        if (model.id == action.modelId) {
          for (let entry of model.entries) {
            if (entry.id == action.entryId) {
              if (entry.validations) {
                entry.validations = [...entry.validations, action.validation];
              } else entry.validations = [action.validation];
              break;
            }
          }
        }
      }
      return { ...state };
    case "DELETE_VALIDATION":
      for (let model of state.models) {
        if (model.id == action.modelId) {
          for (let entry of model.entries) {
            if (entry.id == action.entryId) {
              entry.validations = entry.validations.filter(
                (validation) => validation.id != action.validationId
              );
              break;
            }
          }
        }
      }
      return { ...state };
    case "UPDATE_VALIDATION":
      for (let model of state.models) {
        if (model.id == action.modelId) {
          for (let entry of model.entries) {
            if (entry.id == action.entryId) {
              for (let validation of entry.validations) {
                if (validation.id == action.validationId) {
                  validation = action.validation;
                  break;
                }
              }
            }
          }
        }
      }
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
