import prisma from "../prisma";

interface User {
    email: string;
    password: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    ssn: string;
    dateOfBirth: string;
    firstName: string;
    lastName: string;
}

// export async function createUser(data: User)
// {
//     try {
//         const hashedPassword = await bcrypt.hash(data.password, 10)
//         const user = await prisma.user.create({
//             data:{
//                 ...data,
//                 password: hashedPassword
//             }
//         })
//         return user;
//     }  catch (error) {
//         console.log(error)
//         console.error("Error creating user:", error);
//         throw error;
//       }
// }
// lib/actions/user.actions.ts

export async function createUser(data: User) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
  
      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
  

export async function getAllUsers(){
    try {
        const users = await prisma.user.findMany()
        return users;
    } catch (error) {
        console.log(error, "Error fetching users")
        throw error;
    }
}

export async function getUserByEmail(email: string){
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    } catch (error) {
        console.log(error, "Error fetching users")
        throw error;
    }
}

export async function updateUser(email: string, data: User){}


export async function deleteUser(userId: string) {
    try {
      const user = await prisma.user.delete({ where: { userId } });
      return user;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
