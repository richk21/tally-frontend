export const getUserLocationByIP = async () => {
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (!res.ok) throw new Error('Failed to fetch location');
    const data = await res.json();
    return {
      city: data.city || '',
      state: data.region || '',
      postcode: data.postal || '',
    };
  } catch (error) {
    return {
      city: '',
      state: '',
      postcode: '',
    };
  }
};
