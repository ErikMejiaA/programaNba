import { Nba } from "./Nba.js";
export { CuerpoApoyo };
class CuerpoApoyo extends Nba{
    static idCApoyo = 0;
    constructor(id,nombre,fecha,email,ciudad,year,especialidad,cargo,tipoApoyo,idEquipo,equipo){
        super(id,nombre,fecha,email,ciudad,year);
        this._especialidad = especialidad;
        this._cargo = cargo;
        this._tipoApoyo = tipoApoyo;
        this._idEquipo = idEquipo;
        this._equipo = equipo;
    }
    get especialidad(){
        return this._especialidad;
    }
    set especialidad(v_especialidad){
        this._especialidad = v_especialidad;
    }    
    get cargo(){
        return this._cargo;
    }
    set cargo(v_cargo){
        this._cargo = v_cargo;
    }    
    get tipoApoyo(){
        return this._tipoApoyo;
    }  
    set tipoApoyo(v_tipoApoyo){
        this._tipoApoyo = v_tipoApoyo;
    } 
    get idEquipo(){
        return this._idEquipo;
    }
    set idEquipo(v_idEquipo){
        this._idEquipo = v_idEquipo;
    } 
    get equipo(){
        return this._equipo;
    }
    set equipo(v_equipo){
        this._equipo = v_equipo;
    } 
}