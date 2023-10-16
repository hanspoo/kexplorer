import { CustomMessage } from "../components/utils/utils";
import { MedicionGPS } from "../types";
import { fixNombre } from "../utils";

export function toMedicionGPS(list: CustomMessage[]): Array<MedicionGPS> {
  const medicionesGPS = list
    .map((ele) => JSON.parse(ele.value) as MedicionGPS)
    .map((med) => ({ ...med, paciente: fixNombre(med.paciente) }));

  const medicionesUnicas = medicionesGPS.reduce((acc: Record<string, MedicionGPS>, iter: MedicionGPS) => {
    const key = `${iter.idPaciente}-${iter.fecha}`;
    const obj = acc[key];
    if (obj) return acc;

    acc[key] = iter;

    return acc;
  }, {});

  const unicas = Object.values(medicionesUnicas) as Array<MedicionGPS>;

  return unicas;
}
