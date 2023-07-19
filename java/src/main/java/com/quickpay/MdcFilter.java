package com.quickpay;

import org.slf4j.MDC;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Component
@Order(1)
public class MdcFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;
        MDC.put("userId", "Youngjin");
        MDC.put("sessionId", request.getSession().getId());
        MDC.put("method", request.getMethod());
        MDC.put("request", request.getRequestURI());

        chain.doFilter(servletRequest, servletResponse);

        MDC.clear();
    }
}