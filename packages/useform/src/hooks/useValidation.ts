import React from "react"
import { ValidationError, Schema as YupSchema } from "yup"
import dot from 'dot-prop-immutable'

export function useValidation<TValues extends {}, Schema extends YupSchema<TValues>>(values: TValues, schema?: Schema) {
   const [errors, setErrors] = React.useState<TValues>({} as TValues)

   const validate = React.useCallback(() => {

      schema?.validate(values, { abortEarly: false })
         .then(() => {
            setErrors({} as TValues)
         })
         .catch((e: ValidationError) => {
            let errors = {}
            e.inner.forEach(key => {
               const path = key.path
                  .split('[')
                  .join('.')
                  .split(']')
                  .join('')

               errors = dot.set(errors, path, key.message)
            })
            setErrors({ ...errors } as TValues)
         })

   }, [schema, values])

   React.useEffect(() => {
      validate()
   }, [validate])

   return { errors, isValid: Object.keys(errors).length === 0 }
}