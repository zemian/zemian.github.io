<#include "header.ftl">
	
	<#include "menu.ftl">

	<#list posts as post>
  		<#if (post.status == "published")>
  			<a href="${post.uri}"><h1><#escape x as x?xml>${post.title}</#escape></h1></a>
  			<p>${post.date?string("dd MMMM yyyy")}<#if (post.tags)??>, tags: <#list post.tags as tag_name>
			    <a href="${content.rootpath}tags/${tag_name}.html">${tag_name}</a> 
				</#list>
			</#if>
  			</p>
  			<p>${post.body}</p>
  			<#break>
  		</#if>
  	</#list>
	
	<hr />
	
	<p>Older posts are available in the <a href="${content.rootpath}${config.archive_file}">archive</a>.</p>

<#include "footer.ftl">