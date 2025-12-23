
export interface FormData {
  formType: 'Enrollment' | 'Contact' | 'Free Course';
  name: string;
  email: string;
  phone: string;
  course?: string;
  subject?: string;
  message?: string;
}

/**
 * 💡 FORMSPREE ENDPOINT
 * Linked to: https://formspree.io/f/mrezrvjk
 */
const FORMSPREE_URL = 'https://formspree.io/f/mrezrvjk';

export const submitToGoogleSheet = async (data: FormData): Promise<boolean> => {
  console.log("🚀 [Fuji Sync] Sending data to Formspree...");
  console.log("📦 Data:", data);
  
  try {
    const response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("✅ [Fuji Sync] Success: Form submitted to Formspree.");
      return true;
    } else {
      const errorData = await response.json();
      console.error("❌ [Fuji Sync] Formspree Error:", errorData);
      return false;
    }
  } catch (error) {
    console.error("❌ [Fuji Sync] Failed to connect to Formspree:", error);
    return false;
  }
};
