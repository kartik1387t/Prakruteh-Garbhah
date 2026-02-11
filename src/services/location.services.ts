import { bharatData } from "../data/bharat.data";
import { State, District } from "../types/location.types";

export const getAllStates = (): State[] => {
  return bharatData.states;
};

export const getStateById = (id: string): State | undefined => {
  return bharatData.states.find(state => state.id === id);
};

export const getDistrictById = (
  stateId: string,
  districtId: string
): District | undefined => {
  const state = getStateById(stateId);
  return state?.districts.find(d => d.id === districtId);
};
