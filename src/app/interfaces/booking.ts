import { Movie } from "./movie"
import { Series } from "./series"
import { User } from "./user"

export interface Booking {
    _id: string
    user: User
    movie: Movie
    serie: Series
    startDate: string
    endDate: string
    price: number
    
}
