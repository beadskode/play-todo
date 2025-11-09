import { SignForm } from "./auth/sign-form";
import { Todo } from "./todo";

export default function Home() {
  let session:boolean = false;
  return (
    <div className='h-full'>
      {session ? <Todo /> : <SignForm />} 
    </div>
  );
}
