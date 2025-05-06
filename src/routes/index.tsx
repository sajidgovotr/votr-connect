import { Navigate, useRoutes } from "react-router";
import {
  Login,
  ForgotPassword,
  SetNewPassword,
  ResetPasswordSuccess,
  //auth routes

  Dashboard,
  // app routes
  ClientManagement,
  NotFound,
} from "@/pages";


import { AppLayout, AuthLayout } from "@/layout";
import PublicRoute from "./public-route";
import PrivateRoute from "@/routes/private-route";
import AccountManagement from "@/pages/AccountManagement";
import IntegrationCatalogPage from "@/pages/IntegrationCatalog";
import RestApiIntegration from "@/pages/IntegrationCatalog/RestApiIntegration";
import RestApiSandboxPage from "@/pages/RestApiSandbox";
import LogDetailsPage from "@/pages/RestApiSandbox/LogDetails";
import ProductionApprovalsPage from "@/pages/ProductionApprovals";
import ApprovalDetailPage from "@/pages/ProductionApprovals/ApprovalDetail";
import CreateRequestPage from "@/pages/ProductionApprovals/CreateRequest";
import CreateClient from "@/pages/ClientManagement/CreateClient";
import GraphQLIntegration from '../pages/IntegrationCatalog/GraphQLIntegration';
import FileUploadIntegration from '../pages/IntegrationCatalog/FileUploadIntegration';
import AuditLogs from "@/pages/AuditLogs";
import AuditLogDetails from "@/pages/AuditLogs/AuditLogDetails";
import EmailTemplatesPage from "@/pages/EmailTemplates/EmailTemplatesPage";
import EmailTemplateFormPage from "@/pages/EmailTemplates/EmailTemplateFormPage";
import ExpressIntegrationPage from "@/pages/ExpressIntegration/ExpressIntegrationPage";
import ConfiguredProducts from "@/pages/ConfiguredProducts";
import Integrations from "@/pages/Integrations";


const Routes = () => {
  const routes = [
    {
      path: "/",
      element: <PrivateRoute navLink="/" component={AppLayout} />,
      children: [
        {
          path: "",
          element: <Dashboard />
        }
      ]
    },
    {
      path: "/express-integration",
      element: <PrivateRoute navLink="/express-integration" component={AppLayout} />,
      children: [
        {
          path: "",
          element: <ExpressIntegrationPage />
        }
      ]
    },
    {
      path: '/integrations',
      element: <PrivateRoute navLink="/integrations" component={AppLayout} />,
      children: [
        {
          path: "",
          element: <Integrations />
        }
      ]
    },
    {
      path: "/client-management",
      element: <PrivateRoute navLink="/client-management" component={AppLayout} />,
      children: [
        {
          path: "",
          element: <ClientManagement />
        },
        {
          path: "create",
          element: <CreateClient />
        }
      ]
    },
    {
      path: "/account-management",
      element: <PrivateRoute navLink="/account-management" component={AppLayout} />,
      children: [
        {
          path: "",
          element: <AccountManagement />
        }
      ]
    },
    {
      path: "/integration-catalog",
      element: <PrivateRoute navLink="/integration-catalog" component={AppLayout} />,
      children: [
        {
          path: "",
          element: <IntegrationCatalogPage />
        },
        {
          path: "rest-api-integration",
          element: <RestApiIntegration />
        },
        {
          path: "graphql-integration",
          element: <GraphQLIntegration />
        },
        {
          path: "file-upload-integration",
          element: <FileUploadIntegration />
        },
      ]
    },
    {
      path: "/configured-products",
      element: <PrivateRoute navLink="/configured-products" component={AppLayout} />,
      children: [
        {
          path: "",
          element: <ConfiguredProducts />
        }
      ]
    },
    // {
    //   path: "tradingview",
    //   element: <TradingViewIntegration />
    // },
    {
      path: "/production-approvals",
      element: <PrivateRoute navLink="/production-approvals" component={AppLayout} />,
      children: [
        {
          path: "",
          element: <ProductionApprovalsPage />
        },
        {
          path: "create",
          element: <CreateRequestPage />
        },
        {
          path: ":requestId",
          element: <ApprovalDetailPage />
        }
      ]
    },
    {
      path: "/sandbox/rest-api",
      element: <PrivateRoute navLink="/sandbox/rest-api" component={AppLayout} />,
      children: [
        {
          path: "",
          element: <RestApiSandboxPage />
        },
        {
          path: "logs/:logId",
          element: <LogDetailsPage />
        }
      ]
    },
    {
      path: "/login",
      element: <PublicRoute component={AuthLayout} />,
      children: [
        {
          path: "",
          element: <Login />
        }
      ]
    },
    {
      path: "/forgot-password",
      element: <PublicRoute component={AuthLayout} />,
      children: [
        {
          path: "",
          element: <ForgotPassword />
        }
      ]
    },
    {
      path: "/set-new-password",
      element: <PublicRoute component={AuthLayout} />,
      children: [
        {
          path: "",
          element: <SetNewPassword />
        }
      ]
    },
    {
      path: "/reset-password-success",
      element: <PublicRoute component={AuthLayout} />,
      children: [
        {
          path: "",
          element: <ResetPasswordSuccess />
        }
      ]
    },
    {
      path: "/audit-logs",
      element: <PrivateRoute navLink="/audit-logs" component={AppLayout} />,
      children: [
        {
          path: "",
          element: <AuditLogs />
        },
        {
          path: ":logId",
          element: <AuditLogDetails />
        }
      ]
    },
    {
      path: "/email-templates",
      element: <PrivateRoute navLink="/email-templates" component={AppLayout} />,
      children: [
        {
          path: "",
          element: <EmailTemplatesPage />
        },
        {
          path: "create",
          element: <EmailTemplateFormPage />
        },
        {
          path: "edit/:templateId",
          element: <EmailTemplateFormPage />
        }
      ]
    },
    { path: "404", element: <NotFound /> },
    {
      path: "*",
      element: <Navigate to="/404" />
    }
  ];

  return useRoutes(routes);
}

export default Routes;