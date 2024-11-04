import React from "react";
import { Button } from "../ui/button";

const LoginForm = () => {
  return (
    <div className="relative py-3 w-8/12 mx-auto">
      <div className="min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        <div className="flex flex-col justify-center items-center h-full select-none">
          <div className="flex flex-col items-center justify-center gap-2 mb-8">
            {/* <div className="w-8 h-8 bg-gray-700" src=""></div> */}
            <p className="m-0 text-2xl font-semibold text-black ">
              Iniciar sesión en tu cuenta
            </p>
            <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]">
              Elije tu método de inicio de sesión preferido
            </span>
            <div className="flex items-center justify-center gap-2">
              <Button className="w-56">Google</Button>
              <Button className="w-56">GitHub</Button>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold text-xs text-gray-400">Usuario</label>
          <input
            placeholder="Usuario"
            className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold text-xs text-gray-400">
            Contraseña
          </label>
          <input
            placeholder="••••••••"
            className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
            type="password"
          />
        </div>

        <div>
          <Button className="py-1 px-8 focus:ring-offset-blue-200 text-slate-700 w-full transition ease-in duration-200 text-center text-sm border-gray-600 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none">
            Ingresar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
