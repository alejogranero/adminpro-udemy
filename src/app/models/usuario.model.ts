export class Usuario {
  [x: string]: string;

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public id?: string
    ) {}

}
