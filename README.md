# Cosas por terminar - Frontend
---
## Módulo de creación de cita

- La parte de escoger la especialidad y el médico está listo. Solo falta mejorar el diseño.

*Aquí viene lo peludo...*

- Resulta que para mostrar las citas disponibles del médico, solo tenemos la tabla horario. El problema de esto es cómo podemos verificar que la cita está disponible o no. 

En ese caso habría que modificar la base de datos otra vez...

- Dejando de lado esa parte, tambien hay que crear el formulario completo para crear el usuario ANTES de hacer la cita. La razón de esto es que en el backend yo recupero el correo desde una consulta de la base de datos, y si no existe, dará error 🤪

Igual esto lo podemos cambiar mandando el correo directamente en la request.

- Tambien hay que ver cómo vamos crear un objeto "global" para que se vaya guardando lo que vamos a mandar el backend, que sería lo **siguiente:** 

```json
{
  "fecha": "2025-05-17",
  "hora": "10:00",
  "rut_medico": "12345678-9",
  "rut_paciente": "12345678-9",
  "id_especialidad": 1
}
```
Esto se tiene que hacer si o si ya que al final de la creación de la cita, vamos a colocar un resumen de la cita como lo habiamos planeado anteriormente.

## Módulo de consulta de hora

- Esta parte sería lo más fácil de hacer ya que es una solicitud al backend al http://localhost:4000/citas/rut/12345678-9 y mostrarlo en cartas.

---
Lo más complicado es lo que menciono en el módulo de gestión de citas
