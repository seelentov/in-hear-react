import { useSelector } from 'react-redux'

export const useStoreBy = (name:string) => {
  
  return useSelector((state:any) => state[name])
}
