import { ISurvey } from '../interfaces/Survey';
import { BACKEND_URL } from './LocalitiesApis';

export async function addSurvey(survey: ISurvey) {
  const response = await fetch(`${BACKEND_URL}/surveys/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(survey),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to submit survey');
  }

  return response.json();
}

export async function getData(locality: string) {
  const response = await fetch(
    `${BACKEND_URL}/surveys/getData?locality=${locality}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to submit survey');
  }

  return response.json();
}

export async function getRatingsOverTime(query: string) {
  const response = await fetch(
    `${BACKEND_URL}/surveys/getRatingsOverTime?locality=${query}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to get line chart data');
  }

  return response.json();
}
