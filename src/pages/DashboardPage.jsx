import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
export function DashboardPage() {

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
      console.log(data);
      // тут дальше отправка на бек
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Имя" {...register("firstName")} />

        <input placeholder="Фамилия" {...register("lastName")} />

        <button type="submit">Отправить</button>
      </form>
    );
}
