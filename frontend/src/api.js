
import axios from 'axios';

export const generateMCQs = async (url) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/generate-mcqs', { url });
    if (response && response.data && response.data.mcqs) {
      return response.data.mcqs;
    }
    throw new Error("No MCQs returned");
  } catch (error) {
    console.error("Error generating MCQs:", error);
    throw error;
  }
};
