package com.example.cointracker.ui

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.cointracker.ui.screens.home.HomeScreen
import com.example.cointracker.ui.screens.detail.CoinDetailScreen
import com.example.cointracker.ui.screens.search.SearchScreen

@Composable
fun CoinTrackerApp() {
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = "home") {
        composable("home") {
            HomeScreen(
                onCoinClick = { coinId ->
                    navController.navigate("detail/$coinId")
                },
                onSearchClick = {
                    navController.navigate("search")
                }
            )
        }
        composable("detail/{coinId}") { backStackEntry ->
            CoinDetailScreen(
                coinId = backStackEntry.arguments?.getString("coinId") ?: "",
                onBackClick = {
                    navController.popBackStack()
                }
            )
        }
        composable("search") {
            SearchScreen(
                onBackClick = {
                    navController.popBackStack()
                },
                onCoinClick = { coinId ->
                    navController.navigate("detail/$coinId") {
                        popUpTo("search") { inclusive = true }
                    }
                }
            )
        }
    }
}