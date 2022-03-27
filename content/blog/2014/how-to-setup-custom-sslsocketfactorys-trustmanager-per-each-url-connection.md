Title: How to setup custom SSLSocketFactory's TrustManager per each URL connection
Date: 2014-10-28 00:00:00-05:00
Tags: ssh,java


We can see from javadoc that javax.net.ssl.HttpsURLConnection provided a static method to override with setDefaultSSLSocketFory() method. This allow you to supply a custom javax.net.ssl.TrustManager that may verify your own  CA certs handshake and validation etc. But this will override the default for all "https" URLs per your JVM!

So how can we override just a single https URL? Looking at javax.net.ssl.HttpsURLConnection again we see instance method for setSSLSocketFactory(), but we can't instantiate HttpsURLConnection object directly! It took me some digging to realized that the java.net.URL is actually an factory class for its implementation! One can get an instance like this using new URL("https://localhost").openConnection()

To complete this article, I will provide a simple working example that demonstrate this.
```
package zemian;

import java.io.BufferedReader;

import java.io.InputStream;

import java.io.InputStreamReader;

import java.net.URL;

import java.net.URLConnection;

import java.security.SecureRandom;

import java.security.cert.X509Certificate;

import javax.net.ssl.HttpsURLConnection;

import javax.net.ssl.SSLContext;

import javax.net.ssl.SSLSocketFactory;

import javax.net.ssl.TrustManager;

import javax.net.ssl.X509TrustManager;

public class WGetText {

    public static void main(String[] args) throws Exception {

        String urlString = System.getProperty("url", "https://google.com");

        URL url = new URL(urlString);

        URLConnection urlConnection = url.openConnection();

        HttpsURLConnection httpsUrlConnection = (HttpsURLConnection) urlConnection;

        SSLSocketFactory sslSocketFactory = createTrustAllSslSocketFactory();

        httpsUrlConnection.setSSLSocketFactory(sslSocketFactory);

        try (InputStream inputStream = httpsUrlConnection.getInputStream()) {

            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));

            String line = null;

            while ((line = reader.readLine()) != null) {

                System.out.println(line);

            }

        }

    }

    private static SSLSocketFactory createTrustAllSslSocketFactory() throws Exception {

        TrustManager[] byPassTrustManagers = new TrustManager[] { new X509TrustManager() {

            public X509Certificate[] getAcceptedIssuers() {

                return new X509Certificate[0];

            }

            public void checkClientTrusted(X509Certificate[] chain, String authType) {

            }

            public void checkServerTrusted(X509Certificate[] chain, String authType) {

            }

        } };

        SSLContext sslContext = SSLContext.getInstance("TLS");

        sslContext.init(null, byPassTrustManagers, new SecureRandom());

        return sslContext.getSocketFactory();

    }

}
```

