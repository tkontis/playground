import java.util.Arrays;
import java.util.Comparator;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Equalize {

    public static int equalize(int[] arr) {
	if (arr == null)
	    throw new IllegalArgumentException("Array cannot be null");
	int size = arr.length;
	int maxElementFrequency = Arrays.stream(arr).boxed()
	    .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))
	    .entrySet().stream()
	    .map(Map.Entry::getValue).max(Comparator.naturalOrder()).orElse((long) size).intValue();

	return size - maxElementFrequency;
    }

    public static void main(String[] args) {
	int[] list1 = new int[] {};
	System.out.println(equalize(list1)); // 0

	int[] list2 = new int[] { 2 };
	System.out.println(equalize(list2)); // 0

	int[] list3 = new int[] { 2, 2 };
	System.out.println(equalize(list3)); // 0

	int[] list4 = new int[] { 2, 5 };
	System.out.println(equalize(list4)); // 1

	int[] list5 = new int[] { 3, 3, 2, 1, 3 };
	System.out.println(equalize(list5));  // 2

    }

}
