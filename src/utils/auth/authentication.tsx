export const handleAuthSubmit = async (
    e: React.FormEvent,
    action: "signup" | "login",
    setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    e.preventDefault();
  
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  
    console.log("Making fetch request to /api/auth...");
    const response = await fetch(`api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        action,
      }),
    });
  
    console.log("Response status:", response.status);
    if (!response.ok) {
      const result = await response.json();
      console.log("Error response:", result);
      setErrorMessage(result.error);
    } else {
      window.location.href = `/`;
    }
  };
  
  