import * as React from 'react'
import { create } from '../../../src/Create'

const useForm = create(builder => {
   return {
      name: builder.text().builder('juciano'),
      lastName: builder.text().builder('barbosa'),
      address: {
         street: builder.text().builder('Virginio Belgini'),
         number: builder.number().builder(123),
         city: builder.text().builder('São Paulo'),
         range: [
            builder.number().builder(1),
            builder.number().builder(10),
            builder.number().builder(100)
         ]
      }
   }
})

const Controlled: React.FC = () => {
   const { register, state } = useForm()

   //   React.useEffect(() => {
   //     console.log(state, refs)
   //   }, [state])

   return (
      <div className="row">
         <div className="col-lg-12">
            <h2>Controlled Form</h2>
            <div className="form-group">
               <input
                  placeholder="Name"
                  className="form-control"
                  {...register('name')}
               />
            </div>
            <div className="form-group">
               <input
                  placeholder="Last name"
                  className="form-control"
                  {...register('lastName')}
               />
            </div>

            <div className="form-group">
               <input
                  placeholder="Range 3th position"
                  className="form-control"
                  {...register('address.range[0]')}
               />
            </div>
         </div>
      </div>
   )
}

export default Controlled
