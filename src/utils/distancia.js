const rad = (x) => (x * Math.PI / 180);

const calcular_distancia = (d1,d2) => {
    const R = 6378.137;//Radio de la tierra en km
    const dLat = rad(d2.latitud - d1.latitud);
    const dLong = rad(d2.longitud - d1.longitud);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d.toFixed(3);//Retorna tres decimales
}

export default calcular_distancia;