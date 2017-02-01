package string;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Pluralizer {

    private static final Pattern SUFFIX_PATTERN = Pattern.compile("(?:eau|u[ms]|ex|i[xs]|fe?|on?|a)$");
    private final static Map<String, String> suffixMapper = new HashMap<>(20);
    private final static Map<String, String> irregular = new HashMap<>(100);
    static {
    	// populate suffix map
    	suffixMapper.put("eau", "eaux");
    	suffixMapper.put("us", "i");
    	suffixMapper.put("um", "a");
    	suffixMapper.put("is", "es");
    	suffixMapper.put("ex", "ices");
    	suffixMapper.put("ix", "ices");
    	suffixMapper.put("fe", "ves");
    	suffixMapper.put("f", "ves");
    	suffixMapper.put("on", "a");
    	suffixMapper.put("a", "ae");
    	suffixMapper.put("o", "oes");
    	suffixMapper.put("s", "ses");

    	Path path = FileSystems.getDefault().getPath("irregular.txt");
	try {
	    if (Files.isReadable(path)) {
		Files.lines(path)
		.filter(line-> !(line.startsWith("#") || line.matches("^\\s*$")))
		.forEach(line-> {
		    String[] nounForms = line.trim().split("\\s+");
		    String singular = nounForms[0];
		    String plural = nounForms[1];
		    irregular.put(singular, plural);
		});
	    }
	} catch (IOException e) {
	    e.printStackTrace();
	}
    }

    public static String pluralize(String noun) {
    	noun = noun.toLowerCase();
    	if (irregular.containsKey(noun)) {
    	    return irregular.get(noun);
	}
	String nounSuffix = extractSuffix(noun);
	if (suffixMapper.containsKey(nounSuffix)) {
	    return extractRoot(noun) + suffixMapper.get(nounSuffix);
	}
	return noun.endsWith("s") ? noun + "es" : noun + "s";
    }

    public static String extractRoot(String noun) {
    	return noun.substring(0, noun.lastIndexOf(extractSuffix(noun)));
    }

    public static String extractSuffix(String noun) {
    	if (noun.isEmpty()) return "";
    	Matcher matcher = SUFFIX_PATTERN.matcher(noun);
    	return matcher.find() ? matcher.group() : noun.substring(noun.length()-1);
    }
}
