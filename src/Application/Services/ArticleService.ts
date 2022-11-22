import { BaseService } from "../../Components/BaseServiceClasses/BaseService";
import { ArticleModel } from "../Models/ArticleModel";



export class ArticleService extends BaseService<ArticleModel> {
  protected static instance: ArticleService;

  private constructor() {
    super();
    this.endPointPath = "articles";
  }

  public static getInstance(): ArticleService {
    if (!ArticleService.instance) {
      ArticleService.instance = new ArticleService();
    }
    return ArticleService.instance;
  }
}