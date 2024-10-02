'use server'

import { ID } from "node-appwrite";

import { createSessionClient, createAdminClient, } from "../appwrite"
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();

    const response = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", response.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });


    return parseStringify(response);
  } catch (error) {
    console.error(error, 'error')
  }
}

export const signUp = async (userData: SignUpParams) => {
  try {
    const { account } = await createAdminClient();
    const { email, password, firstName, lastName } = userData;

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (e) {
    console.error(e)
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();

    const sessionCookie = cookies().get('appwrite-session');

    if (!sessionCookie) {
      throw new Error('No session found');
    }

    const user = await account.get();

    return parseStringify(user);
  } catch (error) {
    console.error('Error retrieving user session:', error);
  }
}


export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient()

    cookies().delete('appwrite-session')

    await account.deleteSession('current')

    return true
  } catch (error) {
    console.error(error)
  }
}