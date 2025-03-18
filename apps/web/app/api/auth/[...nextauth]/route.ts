import NEXT_AUTH_OPTIONS from "../../../../lib/Auth";
import NextAuth from "next-auth"
const handle = NextAuth(NEXT_AUTH_OPTIONS);
export {handle as GET , handle as POST};