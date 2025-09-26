export interface IStats {
  ratingsAvg: Record<string, number>;
  amenitiesAvg: Record<string, number>;
  ageDistribution: Record<string, number>;
  occupationDistribution: Record<string, number>;
  comments: string[];
}
