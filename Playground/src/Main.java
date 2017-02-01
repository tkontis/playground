import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {

    public static String stringifyList(List<String> list, String sep) {
	return list.stream()
	    .collect(
		Collectors.collectingAndThen(
		    Collectors.joining(sep),
		    result -> result.isEmpty() ? "" : result.concat(sep)
		)
	    );
    }

    public static String stringifyList2(List<String> list, String sep) {
    	StringBuilder sb = new StringBuilder();
    	for (String e : list) {
	    if (!e.isEmpty()) {
		sb.append(e).append(sep);
	    }
	}
	return sb.toString();
    }

    public static void main(String[] args) {
        String out1 = stringifyList(Arrays.asList("good morning", "good day", "good afternoon", "good evening", "good night"), "<br/>");
        String out2 = stringifyList2(Arrays.asList("good morning", "good day", "good afternoon", "good evening", "good night"), "<br/>");
	System.out.printf("stringify1: %s%n", out1);
	System.out.printf("stringify2: %s%n", out2);

        out1 = stringifyList(Arrays.asList(), "<br/>");
        out2 = stringifyList2(Arrays.asList(), "<br/>");
        System.out.printf("stringify1: %s%n", out1);
        System.out.printf("stringify2: %s%n", out2);

    }
}
