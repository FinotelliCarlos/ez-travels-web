"use client"

import CurrencyInput from "@/components/currency-input"
import DatePicker from "@/components/date-picker"
import Input from "@/components/input"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import Button from "../../components/button"

interface TripSearchForm {
  text: string
  startDate: Date | null
  budget: string
}

const TripSearch = () => {
  const { control, formState: { errors }, register, handleSubmit } = useForm<TripSearchForm>()
  const router = useRouter()

  const onSubmitClick = (data: TripSearchForm) => {
    router.push(`/trips/search?text=${data.text}&startDate=${data.startDate?.toISOString()}&budget=${data.budget}`)
  }

  return (
    <div className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat">
      <h1 className="font-semibold text-2xl text-primaryDarker text-center">
        Encontre sua próxima <span className="text-primary">viagem!</span>
      </h1>

      <div className="flex flex-col gap-4 mt-5">
        <Input {...register('text', {
          required: {
            value: true,
            message: 'Este campo é obrigátorio.'
          }
        })}
          error={!!errors.text}
          errorMessage={errors.text?.message}
          placeholder="Onde você quer ir?" />

        <div className="flex gap-4">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) =>
              <DatePicker
                placeholderText="Data de ida"
                className="w-full"
                onChange={field.onChange}
                selected={field.value}
                minDate={new Date()}
              />}
          />

          <Controller
            name="budget"
            control={control}
            render={({ field }) =>
              <CurrencyInput
                allowDecimals={false}
                onValueChange={(value => field.onChange(value))}
                value={field.value}
                onBlur={field.onBlur}
                placeholder="Orçamento"
                className="w-full"
              />
            }
          />
        </div>

        <Button onClick={() => handleSubmit(onSubmitClick)()}>Buscar</Button>
      </div>
    </div>
  )
}

export default TripSearch