import java.util.*;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.counting;
import static java.util.stream.Collectors.groupingBy;

public class SubsetUtil {

    /**
     * Calculates a subset from a list of integers which contains the maximum number of elements
     * that if added to any other element in the subset produces a non-divisible integer by k.
     * @param ints the initial source of integers from which the subset will be deduced
     * @param k the divisor which helps filter the list
     * @return
     */
    static List<Integer> maxNonDivisibleSubset(int[] ints, int k) {
	if (ints == null) return Collections.EMPTY_LIST;

	int total = ints.length;
	List<Integer> subset = new ArrayList<>(total);
	if (total == 0) {
	    return Collections.EMPTY_LIST;
	}
	else if (total == 1) {
	    if (ints[0] % k == 0) {
		return Collections.EMPTY_LIST;
	    } else {
		subset.add(ints[0]);
	    }
	} else {
	    Map<Integer, Set<Integer>> excludedPairs = new HashMap<>(); // maps ints to a list of those with which they form a divisible sum
	    int[] candidates = IntStream.of(ints)
	    	.boxed()
	    	.collect(groupingBy(x->x, counting()))
	    	.entrySet().stream()
	    	.filter(entry-> {
		    int key = entry.getKey();
		    long freq = entry.getValue();
		    return freq == 1 || (key+key)%k != 0;
	    	})
	    	.flatMapToInt(entry-> entry.getValue()>1 ? IntStream.of(entry.getKey(), entry.getKey()) : IntStream.of(entry.getKey()))
	    	.toArray();


//	    for (int i = 0; i < total - 1; i++) {
//	    	int a = ints[i];
//		excludedPairs.computeIfAbsent(a, HashSet::new);
//		Set<Integer> pairs = excludedPairs.get(a);
//		for (int j = i + 1; j < total; j++) {
//		    int b = ints[j];
//		    int sum = a + b;
//		    sums.computeIfAbsent(sum, s -> s % k != 0);
//		    if (!sums.get(sum)) {
//			continue validateInts;
//		    }
//		}
//		subset.add(ints[i]);
//	    }
	}
	return subset;
    }

}
