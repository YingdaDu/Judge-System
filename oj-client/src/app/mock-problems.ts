import { Problem } from "./models/problem.model";
export const PROBLEMS: Problem[] = [{
  id:1,
  name:"Two Sum",
  desc:'Given an array of integers, return indices of the two numbers such that they add up to a specific target'
  ,
  difficulty:"easy"
},
  {
    id:2,
    name:"3Sum",
    desc:'Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero'
    ,
    difficulty:"medium"
  },
  {
    id:3,
    name:"4Sum",
    desc:'Given an array S of n integers, are there elements a, b, c, and d in S such that a + b + c + d = target? Find all unique quadruplets in the array which gives the sum of target.'
    ,
    difficulty:"medium"
  },
  {
    id: 4,
    name: "Triangle Count",
    desc: 'Given an array of integers, how many three numbers can be found in the array, so that we can build an triangle whose three edges length is the three numbers that we find?',
    difficulty: "hard"
  },
  {
    id: 5,
    name: "Sliding Window Maximum",
    desc: 'Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.',
    difficulty: "super"
  }
];
