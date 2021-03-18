<!DOCTYPE html>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html lang="en">
<head>
    <title><c:out value="${title}" /></title>
    <c:forEach items="${cssFiles}" var="cssFile">
        <link href="/static/css/${cssFile}" rel="stylesheet" />
    </c:forEach>
</head>
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <c:forEach items="${jsFiles}" var="jsFile">
        <script src="/static/js/${jsFile}"></script>
    </c:forEach>
</body>
</html>