import { loginSchema } from "@/lib/validation/authSchema";
import { z } from "zod";
import { alluser } from "@/lib/data/user";


// const alluser: any[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();

   
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      const pretty = z.prettifyError(result.error);
      return Response.json({ message: pretty }, { status: 400 });
    }

    const { email, password } = result.data;

    
    const user = alluser.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return Response.json({ message: "Invalid email or password" },{ status: 401 }
      );
    }

    return Response.json({
      message: "Login successful",
      user,
    });

  } catch (error: any) {
    return Response.json({ message: error.message });
  }
}
