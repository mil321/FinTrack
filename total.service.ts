import{ Injectable } from '@angular/core';
interface calc {
    total: number
}
@Injectable()
export class AuthService{
    private calc: calc

    constructor()
    { }//end
    setUser(user: calc) {
		this.calc = user
	}
    getTotal(): number {
		return this.calc.total

	}
}