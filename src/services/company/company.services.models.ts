import { CategoryService } from "@/models/category.model";
import { Serializable, jsonProperty } from "ts-serializable";

export class CategoriesServiceResponseDTO extends Serializable {
  @jsonProperty([CategoryService], null)
  data: CategoryService[] = [];
}
