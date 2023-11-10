import { Serializable, jsonName, jsonProperty } from "ts-serializable";

export class CategoryService extends Serializable {
  @jsonProperty(Number)
  id = 0;

  @jsonName("nombre")
  @jsonProperty(String)
  name = "";
}
